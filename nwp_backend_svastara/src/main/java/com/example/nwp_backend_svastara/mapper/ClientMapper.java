package com.example.nwp_backend_svastara.mapper;

import com.example.nwp_backend_svastara.dto.request.RegisterRequestDto;
import com.example.nwp_backend_svastara.model.Client;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClientMapper {
    Client map(RegisterRequestDto registerRequestDto);
}

