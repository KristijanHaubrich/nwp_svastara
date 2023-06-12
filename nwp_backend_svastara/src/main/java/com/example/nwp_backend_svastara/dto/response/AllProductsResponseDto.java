package com.example.nwp_backend_svastara.dto.response;

import com.example.nwp_backend_svastara.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AllProductsResponseDto {
    private Boolean productsExist;
    private List<Product> products;
}
