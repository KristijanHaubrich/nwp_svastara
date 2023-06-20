package com.example.nwp_backend_svastara.dto;

import lombok.Data;

@Data
public class ProductWithClientEmailDto {
    private Long id;
    private String name;
    private String description;
    private String price;
    private String clientEmail;
}
