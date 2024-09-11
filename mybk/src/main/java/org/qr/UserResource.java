//package org.qr;
//
//import com.example.model.User;
//import com.google.zxing.BarcodeFormat;
//import com.google.zxing.WriterException;
//import com.google.zxing.qrcode.QRCodeWriter;
//import com.google.zxing.common.BitMatrix;
//import com.google.zxing.client.j2se.MatrixToImageWriter;
//import com.google.zxing.client.j2se.MatrixToImageWriter;
//import io.quarkus.vertx.http.runtime.VertxHttpRecorder;
//import org.apache.camel.builder.RouteBuilder;
//import org.apache.camel.model.rest.RestDefinition;
//import org.apache.camel.component.jackson.JacksonDataFormat;
//import org.eclipse.microprofile.config.inject.ConfigProperty;
//import javax.ws.rs.POST;
//import javax.ws.rs.Path;
//import javax.ws.rs.Produces;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//import java.awt.image.BufferedImage;
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.util.Base64;
//
//@Path("/users")
//public class UserResource {
//
//    @POST
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response createUser(User user) {
//        // Procesa los datos del usuario
//        String qrCode = generateQRCode(user);
//        return Response.ok(qrCode).build();
//    }
//
//    private String generateQRCode(User user) {
//        QRCodeWriter qrCodeWriter = new QRCodeWriter();
//        try {
//            String data = user.toString(); // Modifica esto para serializar adecuadamente los datos del usuario
//            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 300, 300);
//            ByteArrayOutputStream baos = new ByteArrayOutputStream();
//            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);
//            return "data:image/png;base64," + Base64.getEncoder().encodeToString(baos.toByteArray());
//        } catch (WriterException | IOException e) {
//            e.printStackTrace();
//            return "";
//        }
//    }
//}
