package com.product.SbProduct.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.product.SbProduct.Repositary;
import com.product.SbProduct.Model.Product;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {
	
	@Autowired
	Repositary productRepositary;

//****************************************************//
	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	Product create(@RequestBody Product product) {
		  
		product=productRepositary.save(product);
		
		return product;
	}
//**************************************************//
	@GetMapping("/list")
	List<Product> showlist(){
		List<Product> list=new ArrayList<>();
		
		list=productRepositary.findAll();
		return list;
	}
//*************************************************//	
	@GetMapping("/getbyid/{id}")
	Optional<Product> getproduct(@PathVariable int id) {
		
	    return productRepositary.findById(id);
	}
//************************************************//
     
	@GetMapping("/byname/{name}")
	public Product getbyname(@PathVariable String name) {
		
		Product pro = productRepositary.findByName(name);
		
		return pro ;
		
	}
//************************************************//	
	
	@DeleteMapping("/remove/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	 String deleteProduct(@PathVariable int id) {
		
		productRepositary.deleteById(id);
		
		return "Successfully deleted the row!!"+id; 
	 }
//************************************************//	
	@PutMapping("/update/{id}")
	public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product up) {
	    Optional<Product> optionalProduct = productRepositary.findById(id);

	    if (optionalProduct.isPresent()) {
	        Product existingProduct = optionalProduct.get();
	        
	        // Update fields
	        existingProduct.setName(up.getName());
	        existingProduct.setPrice(up.getPrice());
	        existingProduct.setQty(up.getQty());
	        existingProduct.setPhno(up.getPhno());
	        
	        // Save updated product
	        Product updatedProduct = productRepositary.save(existingProduct);

	        return ResponseEntity.ok(updatedProduct);
	    } else {
	        return ResponseEntity.notFound().build();
	    }
	

	}
	
	
	@GetMapping("/getdata")
	String getdata() {
		
	    return "List Of Products";
	}	

}
