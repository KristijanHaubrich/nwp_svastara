package com.example.nwp_backend_svastara.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangePasswordResponseDto {
    private Boolean isOldPasswordMatch;
    private Boolean isNewPasswordSaved;
}
