package com.example.nwp_backend_svastara.controller;
import com.example.nwp_backend_svastara.dto.request.ChangePasswordRequestDto;
import com.example.nwp_backend_svastara.dto.response.AllClientsResponseDto;
import com.example.nwp_backend_svastara.dto.response.BooleanResponseDto;
import com.example.nwp_backend_svastara.dto.response.ChangePasswordResponseDto;
import com.example.nwp_backend_svastara.dto.response.ClientDetailsResponseDto;
import com.example.nwp_backend_svastara.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientService clientService;

    @GetMapping
    public AllClientsResponseDto getAllClients(){
        return clientService.getAllClients();
    }
    @GetMapping("/{email}")
    public ClientDetailsResponseDto getClientDetails(@PathVariable String email){
        return clientService.getClientDetails(email);
    }

    @PatchMapping("/changePass")
    public ChangePasswordResponseDto changePass(@RequestBody ChangePasswordRequestDto changePasswordRequestDto){
        return clientService.changePass(changePasswordRequestDto);
    }
    @DeleteMapping("/{email}")
    public BooleanResponseDto deleteClient(@PathVariable String email){
        return clientService.deleteClient(email);
    }
}

