package com.example.nwp_backend_svastara.dto.response;

import com.example.nwp_backend_svastara.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDetailsResponseDto {
    private Boolean isProductFound;
    private Product product;
}
