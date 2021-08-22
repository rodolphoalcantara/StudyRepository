# JPA

## Intro

JPA é uma api que cria uma interface em comum para frameworks/ORM's de persistencia de dados. Ele mapeia um objeto-relacional para um objeto Java simples. Ao usar essa especificação podemos trocar ORMs sem que o código quebre e tenhamos que realizar diversas alterações.

Para utiliza-la é necessario coloca-la como dependencia (juntamente do driver do banco que iremos usar) e configurar em um arquivo *persistence.xml*, facilmente encontrado na internet.


Algumas propriedades importantes que devemos alterar são:           
    *__Driver__*, *__Url do banco__*, *__User do banco__*, *__Password do banco__*

    <property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver" />
    <property name="javax.persistence.jdbc.url" value="jdbc:mysql://localhost/estudo_jpa" />
    <property name="javax.persistence.jdbc.user" value="root" />
    <property name="javax.persistence.jdbc.password" value="root" />


## Anotações JPA

Para que nossa classe modelo seja reconhecida como uma entidade a ser persistida no banco, devemos usar a anotação __@Entity__ do pacote `javax.persistence`. Este pacote possui todas as classes de persistencia da nossa especificação (JPA).

        @Entity
        public class Conta {}

Além desta anotação, nossa classe precisa também dos atributos que serão inseridos na nossa tabela *Conta*

        @Entity
        public class Conta {
            private Integer agencia;
            private Integer numero;
            private String titular;
        }

Esses atributos serão as colunas de nossa tabela. Porém para que nossos dados sejam unicos devemos também criar um identificador. Neste caso será um atributo do tipo *Long* chamado *id*. Porém apenas definir o atributo da classe java não será suficiente. Precisamos utilizar uma anotação __@Id__, logo acima do atributo, para sinalizarmos que este é um identificador. Além disso, para deixarmos este identificador como *auto-increment* devemos colocar a anotação __@GeneratedValue__ passando __strategy = GenerationType.IDENTITY__ como parâmetro.

`Veja como ficou`

        @Entity
        public class Conta {
            
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Long id;
            private Integer agencia;
            private Integer numero;
            private String titular;

                /*Getters e Setters*/
        }    

Uma conta de um banco deve ser capaz de fazer movimentações também. Suponhamos que em nosso sistema, temos uma classe *Movimentação* nessa classe possuimos alguns atributos como um id, um tipo de movimentação (seja de entrada ou saida), um valor, uma data e uma descrição. Todos com seus respectivos tipos. Porém, o nosso tipo de movimentação é uma constante e com isso podemos criar um Enum. Quando setamos nossos valores padrão, no nosso novo Enum, não podemos passar este valor para o banco desta forma. Para isso, podemos utilizar a anotação de Enum : __@Enumerated__ passando como parametro o tipo que queremos colocar no nosso banco, neste caso queremos que seja do tipo *String* então ficaria *EnumType.STRING*.

`Veja como ficou nossa classe`

        @Entity
        public class Movimentacao {
                
                @Id
                @GeneratedValue(strategy = GenerationType.IDENTITY)
                private Long id;
                
                @Enumerated(EnumType.STRING)
                private TipoMovimentacao tipoMovimentacao;
                
                private BigDecimal valor;
                private LocalDateTime data;
                private String descricao;
                
                /*Getters e Setters*/
        }

Além disso, nossa movimentação deve ser atribuida a uma conta. Ora... Se fazemos uma movimentação de entrada/saida ela deve vir/ir para algum lugar, não é ?

Temos então que criar um atributo de nossa classe para armazenar a conta que estamos fazendo a movimentação. Mas, quando persistirmos no banco, como este atributo irá ser gravado ? Como um *varchar* ? ou um *int*? 

Nós não queremos deste modo !

Nesse caso devemos referenciar nossa tabela, que será criada no nosso banco, à outra tabela. E para utilizarmos a chave estrangeira que virá da nossa tabela conta, devemos utilizar uma anotação que define o relacionamento das tabelas !

A anotação __@ManyToOne__ relaciona o id da Entidade conta como uma chave estrangeira da nossa tabela *Movimentação*. E ainda diz, por baixo dos panos, que o relacionamento é de __Muitos para Um__, ou seja, podem haver muitas movimentações para esta unica conta !

`Veja como ficou nossa classe`

        @Entity
        public class Movimentacao {
                
                @Id
                @GeneratedValue(strategy = GenerationType.IDENTITY)
                private Long id;
                
                @Enumerated(EnumType.STRING)
                private TipoMovimentacao tipoMovimentacao;
                
                private BigDecimal valor;
                private LocalDateTime data;
                private String descricao;

                @ManyToOne
	        private Conta conta;
                
                /*Getters e Setters*/
        }

`OBS:`
`Relacionamentos entre entidades precisam ser configurados pelas anotações no atributo que define o relacionamento na classe`

Existe também uma anotação que permite que o relacionamento __@OneToOne__ (Um para Um) seja unico, ou seja, não aceitando valores duplicados. Por padrão, quando temos um relacionamento __@OneToOne__, ainda não obtemos a restrição que é esperada por um relacionamento __@OneToOne__.

No nosso caso se quisermos que um cliente seja atribuido a apenas uma conta e essa conta só pertença a este cliente e mais nenhum, podemos usar a anotação __@JoinColumn(unique = true)__ passando como parametro que o fator *unique* é verdadeiro.


## EntityManager

Para que possamos realmente realizar todas as operações no banco, devemos utilizar o objeto __EntityManager__ que precisa ser criado pela sua Factory __EntityManagerFactory__.
Para criar o __EntityManagerFactory__ utilizamos o objeto __Persistence__ que representa nosso arquivo *persistence.xml*. Esse objeto possui um método chamado *.createentityManagerFactory(persistence-unit)* que recebe o nome dp *persistence-unit* do nosso arquivo *persistence.xml*.

`Veja um exemplo`


`persistence.xml`

        <persistence-unit name="contas">
        <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
        <class>br.com.alura.jpa.modelo.Conta</class>
            ...


`Classe de persistencia`

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("contas");
        EntityManager createEntityManager = emf.createEntityManager();

        /* Lógica de persistencia */

        emf.close();



## Estados do objeto JPA e operações de persistencia

Para persistir um objeto na tabela, devemos utilizar o *EntityManager*. 

Depois de criarmos e instanciarmos o *EntityManager* podemos acessar o método *.persist()* e passar o objeto como parametro. Este método irá passar nosso objeto do estado __*Transient*__, que é quando o objeto é um Java Bean (sem vinculo com a JPA), e transforma-la em __*Managed*__.

 Porém, mesmo assim, não irá funcionar. 

Para realizar qualquer operação nosso *EntityManager* necessita de uma transação e para isso podemos usar o método *.getTransaction()* e o método da transação para iniciar, *.begin()*. Só assim podemos realizar a mudança do estado do nosso objeto, faltando apenas "comitar" a operação, usando o método da transação *.commit()*.

Diferente do JDBC, que é por padrão *auto commit*, devemos usar o o metodo para comitar as operações abrindo espaço para uma condição, ou seja, se caso a condição não seja satisfeita em vez de comitar a(s) persistencia(s) podemos dar *rollback*. 

`Exemplo:`

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("contas");
		EntityManager em = emf.createEntityManager();
		
		
		
		Conta conta = new Conta();
		conta.setTitular("João");
		conta.setNumero(1234);
		conta.setAgencia(4321);
		
		em.getTransaction().begin();
		
		em.persist(conta); <------ Adição da conta no banco
		
		em.getTransaction().commit();

Vimos como adicionar um dado na tabela do nosso banco. Mas, como fazemos para alterar um dado que já existe ? E se quisermos adicionar o saldo a nossa conta que já existe no banco ?

Primeiro passo é achar a conta que queremos. O nosso *EntityManager* possui um método chamado *.find(entityClass, primaryKey)* que recebe a classe do objeto que estamos procurando e sua chave primaria, que no noss caso é o id da conta.

Depois de achar a conta basta, dentro de uma transação, realizar o set do atributo que queremos alterar, que a JPA já entende que queremos atualizar nosso banco.

`Veja o exemplo:`

        Conta contaQualquer = em.find(Conta.class, 1L);
		
		em.getTransaction().begin();
		
		contaQualquer.setSaldo(20.00);
		
		em.getTransaction().commit();

Isso se dá porque, quando procuramos a classe com o método *.find()* do nosso *EntityManager* o nosso objeto muda para o estado __*Managed*__, este estado, como o nome já diz, está sendo gerenciado pelo JPA e por isto podemos fazer atualizações diretamente no nosso objeto gravado no banco. Existe uma sincronização automática !

Porém quando fechamos nosso *EntityManager* qualquer alteração que seja feita não surtirá efeito no banco pois agora nosso objeto está em um estado chamado __*Detached*__, ou seja, desanexado. Não está sincronizado com o banco !

Se houve qualquer alteração com o objeto em seu estado __*Detached*__ será necessário abrir outra transação e nela chamar o método *.merge(obj)* do nosso *EntityManager* passando o objeto alterado. Com isso o JPA irá procurar o objeto no banco e comparar com o objeto passado por parâmetro, se encontrar o dado no banco será atualizado.

`Veja o exemplo:`

        EntityManager em2 = emf.createEntityManager();
        System.out.println("ID da Conta da Márcia:" + conta.getId());
        conta.setSaldo(500.0);

        em2.getTransaction().begin();

        em2.merge(conta);

        em2.getTransaction().commit();


Se quisermos remover um dado do banco basta pegarmos um objeto de estado __*Managed*__ e passarmos para o estado __*Removed*__ com o método *.remove(obj)* do nosso *EntityManager*.

Assim podemos notar que as querys feitas no banco são resultados das mudanças de estado dos nossos objetos Java. Não necessitamos escrever nenhuma query SQL só foi necessario mudarmos os estados dos objetos com nosso *EntityManager*.

`Resumo:`

        em.getTransaction().begin(); <-- Abre a transação
		
		// Transient ->  Managed 
		em.persist(conta);
		
		// Managed -> Removed
		em.remove(conta);
		
		em.getTransaction().commit(); <-- comita as mudanças

        // Managed -> Detached
        em.close();

        // Detached -> Managed
        em2.merge(conta);

