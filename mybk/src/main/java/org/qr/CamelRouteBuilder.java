package org.qr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jackson.JacksonDataFormat;
import org.qr.model.Dependers;
import org.qr.model.User;
import org.apache.camel.model.rest.RestBindingMode;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CamelRouteBuilder extends RouteBuilder {
    
    
    @Override
    public void configure() throws Exception {
        restConfiguration().bindingMode(RestBindingMode.json);
        // .enableCORS(true) // <-- Important
        
        // .corsAllowCredentials(true) // <-- Important
        // .corsHeaderProperty("Access-Control-Allow-Origin","*")
        // .corsHeaderProperty("Access-Control-Allow-Headers","Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");;


        Dependers dto = new Dependers();
        dto.setPrincUser("1");
        dto.setId("1");
        dto.setDocType("CC");
        dto.setDocNumber("12");
        dto.setName("test");
        dto.setLastName("qr");
        dto.setEmail("email@qw");
        dto.setPhone("123");
        List<Dependers> dependers =  Stream.of(dto).collect(Collectors.toList());
        User us = new User();
        us.setId(1);
        us.setDocType("CC");
        us.setDocNumber(12);
        us.setName("test");
        us.setLastName("qr");
        us.setEmail("email@qw");
        us.setPhone(123456);
        us.setAddress("123");
        us.setPhoto("");
        us.setDependers(dependers);
        List<User> users = Stream.of(us).collect(Collectors.toList());
        // Define tu ruta
        from("rest://post:/users/create?inType=org.qr.mode.User")
            .log("Usuario: ${body}")
            .unmarshal(new JacksonDataFormat(User.class))
            .process(exchange -> {
                User user = exchange.getIn().getBody(User.class);
                users.add(user);
                QRCodeWriter qrCodeWriter = new QRCodeWriter();
                try {
                    String data = user.getDocType() + user.getDocNumber(); // Documento y numero para crear el QR
                    BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 300, 300);
                    ByteArrayOutputStream baos = new ByteArrayOutputStream();
                    MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);
                    exchange.getOut().setBody("data:image/png;base64," + Base64.getEncoder().encodeToString(baos.toByteArray()));
                } catch (WriterException | IOException e) {
                    e.printStackTrace();
                    exchange.getOut().setBody(null);
                }
            })
           .log("outUser: ${body}")
        ;


        from("rest://get:/users/list")
        .log("Obteniendo lista de usuarios")
           .process(exchange ->{
            
            exchange.getOut().setBody(users);
           })
           .marshal().json()
        .log("lista de usuarios: ${body}");

        from("rest://get:/users/detail/{id}")
           .log("Obteniendo usuario")
              .process(exchange ->{
                int id = Integer.valueOf(exchange.getIn().getHeader("id").toString());
                User user = users.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
               exchange.getOut().setBody(user);
              })
           .marshal().json()
        .log("Usuario: ${body}");

        from("rest://put:/users/update/{id}")
           .log("Actualizando usuario :#id")
              .process(exchange ->{ 
                int id = Integer.valueOf(exchange.getIn().getHeader("id").toString());
                User userUpdate = users.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
                userUpdate.setName(us.getName());
               exchange.getOut().setBody(userUpdate);
              })
           .marshal().json()
        .log("usuario actualizado: ${body}");

        from("rest://delete:/users/delete/{id}")
              .log("Obteniendo lista de usuarios")
                 .process(exchange ->{
                    int id = Integer.valueOf(exchange.getIn().getHeader("id").toString());
                    User user = users.stream().filter(f -> f.getId() == id).findFirst().orElse(null);
                    users.remove(user);
                  exchange.getOut().setBody(users);
                 })
                .marshal().json()
        .log("ususario eliminado: ${body}");

    }
}
