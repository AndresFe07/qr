package org.qr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.jackson.JacksonDataFormat;
import org.qr.model.User;
import org.apache.camel.model.rest.RestBindingMode;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

public class CamelRouteBuilder extends RouteBuilder {

    @Override
    public void configure() throws Exception {
        restConfiguration().bindingMode(RestBindingMode.json);

        // Define tu ruta
        from("rest://post:/users?inType=org.qr.mode.User")
            .log("Usuario: ${body}")
            .unmarshal(new JacksonDataFormat(User.class))
            .process(exchange -> {
                User user = exchange.getIn().getBody(User.class);
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

    }
}
