package com.sisolutions.persistence.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sisolutions.persistence.model.DeviceMetadata;

import java.util.List;

public interface DeviceMetadataRepository extends JpaRepository<DeviceMetadata, Long> {

    List<DeviceMetadata> findByUserId(Long userId);
}
