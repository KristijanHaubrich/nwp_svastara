package com.example.nwp_backend_svastara.dto.response;

import com.example.nwp_backend_svastara.model.Client;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private Client client;
    private Boolean isClientFound;
    private Boolean isPasswordCorrect;

}
