package com.example.nwp_backend_svastara.dto.request;

import lombok.Data;

@Data
public class UpdateProductRequestDto {
    private String name;
    private String description;
    private String price;

}
