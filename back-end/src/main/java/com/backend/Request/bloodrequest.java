package com.backend.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class bloodrequest {
    private String bank;
    private String bloodgroup;
    private int units;
}
