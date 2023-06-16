package com.example.nwp_backend_svastara.controller;

import com.example.nwp_backend_svastara.dto.request.NewProductRequestDto;
import com.example.nwp_backend_svastara.dto.request.UpdateProductRequestDto;
import com.example.nwp_backend_svastara.dto.response.*;
import com.example.nwp_backend_svastara.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor

@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    @GetMapping
    public AllProductsResponseDto getAllProducts(){
        return productService.getAllProducts();
    }
    @GetMapping("/{name}")
    public ProductDetailsResponseDto getProductDetails(@PathVariable String name){
        return productService.getProductDetails(name);
    }
    @PostMapping("/add")
    public NewProductResponseDto addProduct(@RequestBody NewProductRequestDto newProductRequestDto){
        return productService.addProduct(newProductRequestDto);
    }

    @PatchMapping("/update")
    public UpdateProductResponseDto updateProduct(@RequestBody UpdateProductRequestDto updateProductRequestDto){
        return productService.updateProduct(updateProductRequestDto);
    }
    @DeleteMapping("/{name}")
    public BooleanResponseDto deleteProduct(@PathVariable String name){
        return productService.deleteProduct(name);
    }
}
