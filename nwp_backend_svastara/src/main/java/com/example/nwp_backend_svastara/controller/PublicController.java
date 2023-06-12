package com.example.nwp_backend_svastara.controller;

import com.example.nwp_backend_svastara.dto.request.AuthRequestDto;
import com.example.nwp_backend_svastara.dto.response.AuthResponseDto;
import com.example.nwp_backend_svastara.dto.request.RegisterRequestDto;
import com.example.nwp_backend_svastara.dto.response.BooleanResponseDto;
import com.example.nwp_backend_svastara.service.PublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class PublicController {
    private final PublicService publicService;
    @PostMapping("/authenticate")
    public AuthResponseDto authenticate(@RequestBody AuthRequestDto authRequestDto){
        return publicService.authenticate(authRequestDto);
    }
    @PostMapping("/registerClient")
    public BooleanResponseDto registerClient(@RequestBody RegisterRequestDto registerRequestDto){
        return publicService.registerClient(registerRequestDto);
    }

    @GetMapping("/checkClientEmail/{email}")
    public BooleanResponseDto checkClientEmail(@PathVariable String email){
        return publicService.checkClientEmail(email);
    }
}
