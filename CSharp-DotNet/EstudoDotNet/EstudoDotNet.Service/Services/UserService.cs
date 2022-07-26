using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using EstudoDotNet.Domain.Interfaces.Services.User;

namespace EstudoDotNet.Service.Services
{
    //Aqui pode ficar as regras de negocio da persistencia.
    public class UserService : IUserService
    {
        private IRepository<UserEntity> _repository;

        public UserService(IRepository<UserEntity> repository)
        {
            _repository = repository;
        }

        public async Task<bool> Delete(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }

        public async Task<UserEntity> Get(Guid id)
        {
            return await _repository.SelectAsync(id);
        }

        public async Task<IEnumerable<UserEntity>> GetAll()
        {
            return await _repository.SelectAsync();
        }

        public async Task<UserEntity> Post(UserEntity user)
        {
            return await _repository.InsertAsync(user);
        }

        public async Task<UserEntity> Put(UserEntity user)
        {
            return await _repository.UpdateAsync(user);
        }
    }
}
