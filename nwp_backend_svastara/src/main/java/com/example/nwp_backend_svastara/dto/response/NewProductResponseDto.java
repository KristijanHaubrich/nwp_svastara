package com.example.nwp_backend_svastara.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NewProductResponseDto {
    private Boolean productAlreadyExist;
    private Boolean isClientFound;
    private Boolean isProductSaved;
}
