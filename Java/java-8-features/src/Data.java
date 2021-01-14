import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.Period;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

public class Data {

	public static void main(String[] args) {

		//LocalDate possui diversos métodos estaticos
		LocalDate hoje = LocalDate.now();
		System.out.println(hoje);
		
		//.of serve para passarmos uma data que não seja a de agora
		LocalDate olimpiadasRio = LocalDate.of(2016, Month.JUNE, 5);
		
		
		//class Period usado para contas com datas, nome sugestivo.
		Period periodo = Period.between(olimpiadasRio, hoje);
		//retorna um valor estranho, porem a classe possui getters como de data. (ex.: getDays())
		System.out.println(periodo);
		
		//obj imutavel, necessario guardar em outra variavel
		LocalDate proximasOlimpiadas = olimpiadasRio.plusYears(4);
		
		System.out.println(proximasOlimpiadas);
		
		
		//formatador para trabalhar com datas
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		
		String valorFormatado = proximasOlimpiadas.format(formatter);
		System.out.println(valorFormatado);
		
		
		//para horas minutos segundos usa-se LocalDateTime
		LocalDateTime agora = LocalDateTime.now();
		DateTimeFormatter formatterWHours = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm");
		
		System.out.println(agora.format(formatterWHours));
		
		//conversão para LocalDate
		agora.toLocalDate();
		
		//nao é necessario usar todo o conjunto: dia/mes/ano hora:minuto
		YearMonth mesEAno = YearMonth.now();
		System.out.println(mesEAno);
		
		LocalTime intervalo = LocalTime.of(15, 30);
		System.out.println(intervalo);
		
	}

}
