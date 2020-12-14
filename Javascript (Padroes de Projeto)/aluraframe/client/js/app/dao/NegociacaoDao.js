class NegociacaoDao {
		constructor(connection){
				this._connection = connection;
				this._store = 'negociacoes';
		}

		add(negociacao){
				return new Promise((resolve,reject) =>{
				let request = this._connection
						.transaction([this._store], 'readwrite')
						.objectStore(this._store)
						.add(negociacao);

						
				request.onsuccess = e =>{
						resolve();
				};
				request.onerror = e =>{
						console.log(e.target.error);
						reject('Não foi possível adicionar a negociação');
				};

				})
		}

		listAll(){
				return new Promise((resolve,reject) => {
					let negociacoes = [];

					let cursor = this._connection
						.transaction([this._store], 'readwrite')
						.objectStore(this._store)
						.openCursor();
								

						cursor.onsuccess = event => {
								let actual = event.target.result;

								if(actual){
										let data = actual.value;
										negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));

										actual.continue();

								}else{
										resolve(negociacoes);
								}
						}

						cursor.onerror = event => {
								console.log(event.target.error.name);
								reject('Não foi possível listar as Negociações')
						}
				})
		}

		clearAll(){
			return new Promise((resolve,reject) => {

				let request = this._connection
						.transaction([this._store], 'readwrite')
						.objectStore(this._store)
						.clear();

				request.onsuccess = e => resolve('Negociações apagadas com sucesso');
				request.onerror = e => {
					console.log(e.target.error)
					reject('Não foi possível apagar as negociações');
				}

			})
		}
}