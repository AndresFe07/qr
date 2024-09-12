package org.qr.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonAutoDetect
public class Dependers {
    private String princUser;
    private String id;
    private String docType;
    private String docNumber;
    private String name;
    private String lastName;
    private String email;
    private String phone;

    @Override
    public String toString() {
        Dependers dto = new Dependers();
        dto.setPrincUser(princUser);
        dto.setId(id);
        dto.setDocType(docType);
        dto.setDocNumber(docNumber);
        dto.setName(name);
        dto.setLastName(lastName);
        dto.setEmail(email);
        dto.setPhone(phone);
        String jsonp = null;
        try {
            jsonp = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(dto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonp;
    }
}