package org.cfs.smarttaskmanager.Controller;

import jakarta.validation.Valid;
import org.cfs.smarttaskmanager.Entity.Item;
import org.cfs.smarttaskmanager.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    // Add New Item
    @PostMapping
    public Item addItem(@Valid @RequestBody Item item) {
        return itemService.addItem(item);
    }

    // Get Item by ID
    @GetMapping("/{id}")
    public Item getItem(@PathVariable Long id) {
        return itemService.getItemById(id);
    }
}
