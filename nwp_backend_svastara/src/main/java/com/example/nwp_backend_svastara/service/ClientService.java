package com.example.nwp_backend_svastara.service;

import com.example.nwp_backend_svastara.dto.request.ChangePasswordRequestDto;
import com.example.nwp_backend_svastara.dto.response.AllClientsResponseDto;
import com.example.nwp_backend_svastara.dto.response.BooleanResponseDto;
import com.example.nwp_backend_svastara.dto.response.ChangePasswordResponseDto;
import com.example.nwp_backend_svastara.dto.response.ClientDetailsResponseDto;
import com.example.nwp_backend_svastara.jpa_repository.ClientRepo;
import com.example.nwp_backend_svastara.model.Client;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepo clientRepo;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public AllClientsResponseDto getAllClients(){
        List<Client> clients = clientRepo.findAll();
        Boolean clientsExist = !clients.isEmpty();
        return new AllClientsResponseDto(clientsExist,clients);
    }
    @Transactional
    public ClientDetailsResponseDto getClientDetails(String email){
        Optional<Client> dbClient = clientRepo.findByEmail(email);
        if(dbClient.isPresent()){
            return new ClientDetailsResponseDto(dbClient.get(),true);
        }else return new ClientDetailsResponseDto(null,false);
    }
    @Transactional
    public BooleanResponseDto deleteClient(String email) {
        Optional<Client> dbClient = clientRepo.findByEmail(email);
        if(dbClient.isPresent()){
            clientRepo.delete(dbClient.get());
            Optional<Client> deletedClient = clientRepo.findByEmail(email);
            return new BooleanResponseDto(!deletedClient.isPresent());
        }else return new BooleanResponseDto(false);
    }
    @Transactional
    public ChangePasswordResponseDto changePass(ChangePasswordRequestDto changePasswordRequestDto) {
        Optional<Client> dbClient = clientRepo.findByEmail(changePasswordRequestDto.getEmail());
        Boolean isOldPasswordMatch = false;
        Boolean isNewPasswordSaved = false;
        if(dbClient.isPresent()){
            if(passwordEncoder.matches(changePasswordRequestDto.getOldPassword(), dbClient.get().getPassword())){
                isOldPasswordMatch = true;
                dbClient.get().setPassword(passwordEncoder.encode(changePasswordRequestDto.getNewPassword()));

                Optional<Client> dbChangedClient = clientRepo.findByEmail(changePasswordRequestDto.getEmail());
                isNewPasswordSaved = passwordEncoder.matches(changePasswordRequestDto.getNewPassword(),dbChangedClient.get().getPassword());
            }
        }



        return new ChangePasswordResponseDto(isOldPasswordMatch,isNewPasswordSaved);
    }
}
