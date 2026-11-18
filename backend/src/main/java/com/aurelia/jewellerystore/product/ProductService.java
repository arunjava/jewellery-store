package com.aurelia.jewellerystore.product;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class ProductService {
    private final List<Product> products = List.of(
            product("solstice-gold-hoops", "Solstice Gold Hoops", "Earrings", "68.00",
                    "A little golden hour for every day. These softly sculpted hoops are light enough to wear from morning to midnight.",
                    "18k gold vermeil", "photo-1535632066927-ab7c9ab60908", true),
            product("celeste-pearl-drops", "Celeste Pearl Drops", "Earrings", "92.00",
                    "Luminous freshwater pearls meet a fine gold setting for a graceful, modern heirloom.",
                    "Freshwater pearl, 14k gold", "photo-1617038220319-276d3cfab638", true),
            product("everyday-signet", "Everyday Signet Ring", "Rings", "74.00",
                    "A clean-lined signet with a satin finish. Made to be worn solo or stacked with your favourites.",
                    "Recycled sterling silver", "photo-1605100804763-247f67b3557e", false),
            product("luna-layered-chain", "Luna Layered Chain", "Necklaces", "118.00",
                    "Two delicate chains, one effortless layer. Finished with a tiny crescent charm that catches the light.",
                    "18k gold vermeil", "photo-1599643478518-a784e5dc4c8f", true),
            product("wildflower-pendant", "Wildflower Pendant", "Necklaces", "86.00",
                    "A hand-finished floral pendant inspired by slow summer mornings and the beauty in small things.",
                    "Recycled sterling silver", "photo-1611652022419-a9419f74343d", false),
            product("arc-cuff-bracelet", "Arc Cuff Bracelet", "Bracelets", "104.00",
                    "An open cuff with an architectural curve and a polished finish. Adjustable for a comfortable fit.",
                    "18k gold vermeil", "photo-1611591437281-460bfbe1220a", false),
            product("mira-stud-set", "Mira Stud Set", "Earrings", "56.00",
                    "Three pairs of delicate studs designed to mix, match, and make your own constellation.",
                    "14k recycled gold", "photo-1617038220319-276d3cfab638", false),
            product("tide-stacking-rings", "Tide Stacking Rings", "Rings", "82.00",
                    "A set of two softly rippled bands, shaped by the quiet rhythm of the sea.",
                    "Recycled sterling silver", "photo-1605100804763-247f67b3557e", true),
            product("dawn-charm-necklace", "Dawn Charm Necklace", "Necklaces", "98.00",
                    "A sunlit charm on a fine adjustable chain. A thoughtful little reminder to begin again.",
                    "18k gold vermeil", "photo-1599643478518-a784e5dc4c8f", false),
            product("solace-pearl-bracelet", "Solace Pearl Bracelet", "Bracelets", "88.00",
                    "Tiny freshwater pearls and a fine gold chain come together in a quietly beautiful everyday piece.",
                    "Freshwater pearl, 14k gold", "photo-1611591437281-460bfbe1220a", false),
            product("orbit-mini-hoops", "Orbit Mini Hoops", "Earrings", "62.00",
                    "Small sculptural hoops with a softly rounded profile and a secure hinged closure.",
                    "18k gold vermeil", "photo-1535632066927-ab7c9ab60908", false),
            product("heirloom-chain-bracelet", "Heirloom Chain Bracelet", "Bracelets", "112.00",
                    "A refined paperclip chain bracelet with a generous extension for your perfect fit.",
                    "Recycled sterling silver", "photo-1611591437281-460bfbe1220a", false)
    );

    public List<Product> findAll(String query, String category) {
        String search = query == null ? "" : query.trim().toLowerCase(Locale.ROOT);
        String selectedCategory = category == null ? "" : category.trim();
        return products.stream()
                .filter(product -> selectedCategory.isBlank() || product.category().equalsIgnoreCase(selectedCategory))
                .filter(product -> search.isBlank()
                        || (product.name() + " " + product.description() + " " + product.category() + " " + product.material())
                        .toLowerCase(Locale.ROOT).contains(search))
                .toList();
    }

    public Optional<Product> findById(String id) {
        return products.stream().filter(product -> product.id().equals(id)).findFirst();
    }

    public List<String> findCategories() {
        return products.stream().map(Product::category).distinct().sorted().toList();
    }

    private Product product(String id, String name, String category, String price, String description,
                            String material, String imageId, boolean featured) {
        return new Product(id, name, category, new BigDecimal(price), description, material,
                "https://images.unsplash.com/" + imageId + "?auto=format&fit=crop&w=900&q=85",
                featured, true);
    }
}
