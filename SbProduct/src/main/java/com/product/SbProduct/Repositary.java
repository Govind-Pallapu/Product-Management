package com.product.SbProduct;

import org.springframework.data.jpa.repository.JpaRepository;

import com.product.SbProduct.Model.Product;



public interface Repositary extends JpaRepository<Product, Integer>{
	
	
	public abstract Product findByName(String name);

}
