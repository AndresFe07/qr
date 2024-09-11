//package org.qr.process;
//
//import com.google.zxing.BarcodeFormat;
//import com.google.zxing.WriterException;
//import com.google.zxing.client.j2se.MatrixToImageWriter;
//import com.google.zxing.common.BitMatrix;
//import com.google.zxing.qrcode.QRCodeWriter;
//import org.apache.camel.Exchange;
//import org.apache.camel.Processor;
//import org.apache.camel.spi.annotations.Component;
//import org.qr.model.User;
//
//import java.io.ByteArrayOutputStream;
//import java.io.IOException;
//import java.util.Base64;
//@Component("generateQR")
//public class GenerateQR implements Processor {
//
//    @Override
//    public void process(Exchange exchange) throws Exception {
//        User user = exchange.getIn().getBody(User.class);
//
//        System.out.println(generateQRCode(user));
//        exchange.getOut().setBody(generateQRCode(user));
//    }
//    private String generateQRCode(User user) {
//        QRCodeWriter qrCodeWriter = new QRCodeWriter();
//        try {
//            String data = user.getDocType().toString(); // Modifica esto para serializar adecuadamente los datos del usuario
//            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 300, 300);
//            ByteArrayOutputStream baos = new ByteArrayOutputStream();
//            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", baos);
//            return "data:image/png;base64," + Base64.getEncoder().encodeToString(baos.toByteArray());
//        } catch (WriterException | IOException e) {
//            e.printStackTrace();
//            return "";
//        }
//    }
//
//
//}
