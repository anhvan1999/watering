package com.coderteam.watering;

import org.hibernate.dialect.H2Dialect;

public class H2TestDialect extends H2Dialect {

    @Override
    public boolean dropConstraints() {
        return true;
    }

    @Override
    public boolean supportsIfExistsAfterAlterTable() {
        return true;
    }

}
