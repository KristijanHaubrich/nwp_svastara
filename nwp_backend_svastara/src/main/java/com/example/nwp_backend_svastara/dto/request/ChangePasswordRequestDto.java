package com.example.nwp_backend_svastara.dto.request;

import lombok.Data;

@Data
public class ChangePasswordRequestDto {
    private String oldPassword;
    private String newPassword;
    private String email;
}
