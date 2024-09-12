package org.qr.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
@Getter
@Setter
@JsonAutoDetect
public class User implements Serializable {

    private static final long serialVersionUID = -1L; 
    @NonNull
    private int id;
    private String docType;
    private int docNumber;
    private String name;
    private String lastName;
    private String email;
    private int phone;
    private String address;
    private String photo;
    private List<Dependers> dependers;

    // Getters and setters
    @Override
    public String toString() {
        User dto = new User();
        dto.setId(id);
        dto.setDocType(docType);
        dto.setDocNumber(docNumber);
        dto.setName(name);
        dto.setLastName(lastName);
        dto.setEmail(email);
        dto.setPhone(phone);
        dto.setAddress(address);
        dto.setPhoto(photo);
        dto.setDependers(dependers);
        String jsonp = null;
        try {
            jsonp = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(dto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return jsonp;
    }
}
