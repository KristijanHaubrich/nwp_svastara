package com.example.nwp_backend_svastara.mapper;

import com.example.nwp_backend_svastara.dto.ProductWithClientEmailDto;
import com.example.nwp_backend_svastara.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductWithClientEmailDto map(Product product);
}
