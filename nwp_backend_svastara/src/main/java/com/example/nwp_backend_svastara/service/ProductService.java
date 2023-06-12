package com.example.nwp_backend_svastara.service;

import com.example.nwp_backend_svastara.dto.request.NewProductRequestDto;
import com.example.nwp_backend_svastara.dto.request.UpdateProductRequestDto;
import com.example.nwp_backend_svastara.dto.response.*;
import com.example.nwp_backend_svastara.jpa_repository.ClientRepo;
import com.example.nwp_backend_svastara.jpa_repository.ProductRepo;
import com.example.nwp_backend_svastara.model.Client;
import com.example.nwp_backend_svastara.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo productRepo;
    private final ClientRepo clientRepo;

    @Transactional
    public NewProductResponseDto addProduct(NewProductRequestDto newProductRequestDto){
        Optional<Client> dbClient = clientRepo.findByEmail(newProductRequestDto.getClientEmail());
        Boolean isClientFound = dbClient.isPresent();

        Boolean productAlreadyExist = false;
        Boolean isProductSaved = false;

        if(isClientFound){
            Optional<Product> existingProduct = productRepo.findByName(newProductRequestDto.getName());
            productAlreadyExist = existingProduct.isPresent();

            if(!productAlreadyExist){
                Product product = Product.builder()
                        .name(newProductRequestDto.getName())
                        .description(newProductRequestDto.getDescription())
                        .price(newProductRequestDto.getPrice())
                        .client(dbClient.get())
                        .build();
                productRepo.save(product);

                Optional<Product> newProduct = productRepo.findByName(newProductRequestDto.getName());
                isProductSaved = newProduct.isPresent();
            }
        }
        return new NewProductResponseDto(productAlreadyExist,isClientFound,isProductSaved);

    }

    @Transactional
    public ProductDetailsResponseDto getProductDetails(String name){
        Optional<Product> dbProduct = productRepo.findByName(name);
        Boolean isProductFound = dbProduct.isPresent();
        Product product = null;
        if(isProductFound){
            product = dbProduct.get();
        }
        return new ProductDetailsResponseDto(isProductFound,product);
    }

    @Transactional
    public AllProductsResponseDto getAllProducts(){
        List<Product> products = productRepo.findAll();
        Boolean noProducts = products.isEmpty();
        return new AllProductsResponseDto(!noProducts,products);
    }

    @Transactional
    public BooleanResponseDto deleteProduct(String name){
        Optional<Product> dbProduct = productRepo.findByName(name);
        if(dbProduct.isPresent()){
            productRepo.delete(dbProduct.get());
        }
        Optional<Product> deletedProduct = productRepo.findByName(name);
        return new BooleanResponseDto(!deletedProduct.isPresent());
    }
    @Transactional
    public UpdateProductResponseDto updateProduct(UpdateProductRequestDto updateProductRequestDto) {
        Optional<Product> dbProduct = productRepo.findByName(updateProductRequestDto.getName());
        Boolean productExist = dbProduct.isPresent();
        Boolean isProductUpdated = false;
        if(productExist){
            dbProduct.get().setDescription(updateProductRequestDto.getDescription());
            dbProduct.get().setPrice(updateProductRequestDto.getPrice());

            Optional<Product> dbUpdatedProduct = productRepo.findByName(updateProductRequestDto.getName());
            isProductUpdated = dbUpdatedProduct.get().getDescription() == updateProductRequestDto.getDescription() && dbUpdatedProduct.get().getPrice() == updateProductRequestDto.getPrice();
        }
        return new UpdateProductResponseDto(productExist,isProductUpdated);

    }
}
