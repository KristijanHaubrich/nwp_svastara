package com.example.nwp_backend_svastara.dto.response;

import com.example.nwp_backend_svastara.model.Client;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ClientDetailsResponseDto {
    private Client client;
    private Boolean isClientFound;
}
