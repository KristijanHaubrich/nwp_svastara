package com.example.nwp_backend_svastara.dto.response;

import com.example.nwp_backend_svastara.dto.ProductWithClientEmailDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AllProductsResponseDto {
    private Boolean productsExist;
    private List<ProductWithClientEmailDto> products;
}
