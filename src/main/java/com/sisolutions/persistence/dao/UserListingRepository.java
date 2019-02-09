package com.sisolutions.persistence.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisolutions.persistence.model.UserListing;

public interface UserListingRepository extends JpaRepository<UserListing, Long> {

    List<UserListingRepository> findByUserId(Long userId);
    
}
