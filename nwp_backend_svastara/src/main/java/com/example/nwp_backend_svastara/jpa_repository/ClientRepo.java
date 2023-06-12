package com.example.nwp_backend_svastara.jpa_repository;

import com.example.nwp_backend_svastara.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepo extends JpaRepository<Client,Long> {
    Optional<Client> findByEmail(String email);
}
