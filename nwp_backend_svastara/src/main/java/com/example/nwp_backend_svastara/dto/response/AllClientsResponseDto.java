package com.example.nwp_backend_svastara.dto.response;

import com.example.nwp_backend_svastara.model.Client;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AllClientsResponseDto {
    private Boolean clientsExist;
    private List<Client> clients;
}
