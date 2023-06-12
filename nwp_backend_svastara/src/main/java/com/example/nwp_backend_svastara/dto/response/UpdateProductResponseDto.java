package com.example.nwp_backend_svastara.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateProductResponseDto {
    private final Boolean productExist;
    private final Boolean isProductUpdated;
}
