package com.aurelia.jewellerystore.product;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ProductServiceTest {
    private final ProductService productService = new ProductService();

    @Test
    void filtersProductsByCategoryAndSearchTerm() {
        var matches = productService.findAll("pearl", "Earrings");

        assertEquals(1, matches.size());
        assertEquals("celeste-pearl-drops", matches.get(0).id());
    }

    @Test
    void returnsEmptyWhenProductDoesNotExist() {
        assertTrue(productService.findById("not-a-product").isEmpty());
    }
}
