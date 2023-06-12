package com.example.nwp_backend_svastara.dto.request;

import lombok.Data;

@Data
public class NewProductRequestDto {
    private String name;
    private String description;
    private String price;
    private String clientEmail;
}
