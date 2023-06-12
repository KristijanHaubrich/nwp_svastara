package com.example.nwp_backend_svastara.service;

import com.example.nwp_backend_svastara.auth.JwtService;
import com.example.nwp_backend_svastara.dto.request.AuthRequestDto;
import com.example.nwp_backend_svastara.dto.response.AuthResponseDto;
import com.example.nwp_backend_svastara.dto.request.RegisterRequestDto;
import com.example.nwp_backend_svastara.dto.response.BooleanResponseDto;
import com.example.nwp_backend_svastara.jpa_repository.ClientRepo;
import com.example.nwp_backend_svastara.mapper.ClientMapper;
import com.example.nwp_backend_svastara.model.Client;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class PublicService {
    private final ClientRepo clientRepo;
    private final JwtService jwtService;
    private final int tokenDurationInMilis = 1000*60*60*24*10; //10 dana
    private final PasswordEncoder passwordEncoder;
    private final ClientMapper clientMapper;
    @Transactional
    public AuthResponseDto authenticate(AuthRequestDto authRequestDto){
        Optional<Client> dbClient = clientRepo.findByEmail(authRequestDto.getEmail());
        Client client = null;
        Boolean isClientFound = dbClient.isPresent();
        Boolean isPasswordCorrect = false;

        if(isClientFound){
            client = dbClient.get();
            isPasswordCorrect = passwordEncoder.matches(authRequestDto.getPassword(), client.getPassword());

            if(isPasswordCorrect){
                String accessToken = jwtService.generateToken(client,tokenDurationInMilis);
                client.setAccessToken(accessToken);
            }else client = null;
        }

        return new AuthResponseDto(client,isClientFound,isPasswordCorrect);
    }

    @Transactional
    public BooleanResponseDto registerClient(RegisterRequestDto registerRequestDto) {
        Client client = clientMapper.map(registerRequestDto);
        client.setAccessToken("null");
        client.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));
        clientRepo.save(client);

        Optional<Client> dbClient = clientRepo.findByEmail(registerRequestDto.getEmail());
        return new BooleanResponseDto(dbClient.isPresent());

    }
    @Transactional
    public BooleanResponseDto checkClientEmail(String email) {
        Optional<Client> client = clientRepo.findByEmail(email);
        return new BooleanResponseDto(client.isPresent());
    }
}


