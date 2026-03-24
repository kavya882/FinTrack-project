package com.example.demo.service;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TransactionResponse;
import com.lowagie.text.Document;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.opencsv.CSVWriter;

@Service
public class ReportService {

    private final TransactionService transactionService;

    public ReportService(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    public byte[] generateCsvReport(String username) throws Exception {
        List<TransactionResponse> transactions = transactionService.getAllTransactions(username);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(outputStream);
        CSVWriter csvWriter = new CSVWriter(outputStreamWriter);

        csvWriter.writeNext(new String[] {
                "ID", "Title", "Note", "Type", "Category", "Amount", "Date"
        });

        for (TransactionResponse transaction : transactions) {
            csvWriter.writeNext(new String[] {
                    String.valueOf(transaction.getId()),
                    transaction.getTitle() != null ? transaction.getTitle() : "",
                    transaction.getNote() != null ? transaction.getNote() : "",
                    transaction.getType() != null ? transaction.getType().name() : "",
                    transaction.getCategory() != null ? transaction.getCategory().name() : "",
                    transaction.getAmount() != null ? transaction.getAmount().toString() : "",
                    transaction.getDate() != null ? transaction.getDate().toString() : ""
            });
        }

        csvWriter.close();
        return outputStream.toByteArray();
    }

    public byte[] generatePdfReport(String username) throws Exception {
        List<TransactionResponse> transactions = transactionService.getAllTransactions(username);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);

        document.open();
        document.add(new Paragraph("FinTrack Transaction Report"));
        document.add(new Paragraph(" "));

        for (TransactionResponse transaction : transactions) {
            String line =
                    "ID: " + transaction.getId()
                    + " | Title: " + transaction.getTitle()
                    + " | Note: " + (transaction.getNote() != null ? transaction.getNote() : "")
                    + " | Type: " + transaction.getType()
                    + " | Category: " + transaction.getCategory()
                    + " | Amount: " + transaction.getAmount()
                    + " | Date: " + transaction.getDate();

            document.add(new Paragraph(line));
            document.add(new Paragraph(" "));
        }

        document.close();
        return outputStream.toByteArray();
    }
}