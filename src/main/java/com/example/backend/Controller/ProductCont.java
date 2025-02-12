package com.example.backend.Controller;

import com.example.backend.Entity.Product;
import com.example.backend.Repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class ProductCont {

    @Autowired
    private ProductRepo p;

    @PostMapping("/AddProduct")
    public ResponseEntity<?>AddProduct(@RequestBody Product obj){
        p.save(obj);
        return new ResponseEntity<>("Product added Successfully", HttpStatus.OK);
    }

    @GetMapping("/GetProduct")
    public ResponseEntity<?>GetProduct(){
        var productlst=p.findAll();
        return new ResponseEntity<>(productlst,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?>updateProduct(@RequestBody Product obj){

        var Product=p.findById(obj.getId()).orElseThrow(()->new RuntimeException("Product id not found"));
        Product.setProductname(obj.getProductname());
        Product.setPrice(obj.getPrice());
        p.save(Product);
        return new ResponseEntity<>("Product updated Successfully",HttpStatus.OK);
    }


    @DeleteMapping("/delp/{id}")
    public ResponseEntity<?>DeleteProduct(@PathVariable Integer id){
        var Product=p.findById(id).orElseThrow(()-> new RuntimeException("Product id not found"));
        p.delete(Product);
        return new ResponseEntity<>("product Delete Successfully",HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?>updateProduct(@PathVariable Integer id,@RequestBody Product obj){
        var Product=p.findById(id).orElseThrow(()-> new RuntimeException("Product id not found"));
        Product.setProductname(obj.getProductname());
        Product.setPrice(obj.getPrice());
        Product.setDescription(obj.getDescription());
        p.save(Product);
        return new ResponseEntity<>("product delete successfully",HttpStatus.OK);
    }

    @DeleteMapping("/delp")
    public  ResponseEntity<?>DeleteProduct(@RequestBody Product obj) {
        var Product=p.findById(obj.getId()).orElseThrow(()->new RuntimeException(("product id not found")));
        p.delete(Product);
        return new ResponseEntity<>("Product deleted successfully" ,HttpStatus.OK);

    }


}
