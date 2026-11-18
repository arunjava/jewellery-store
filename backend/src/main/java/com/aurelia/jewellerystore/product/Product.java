package com.aurelia.jewellerystore.product;

import java.math.BigDecimal;

public record Product(
        String id,
        String name,
        String category,
        BigDecimal price,
        String description,
        String material,
        String imageUrl,
        boolean featured,
        boolean inStock
) {}
