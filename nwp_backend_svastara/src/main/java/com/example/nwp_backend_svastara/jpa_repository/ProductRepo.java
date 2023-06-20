package com.example.nwp_backend_svastara.jpa_repository;

import com.example.nwp_backend_svastara.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepo extends JpaRepository<Product,Long> {
    Optional<Product> findByName(String name);
}
