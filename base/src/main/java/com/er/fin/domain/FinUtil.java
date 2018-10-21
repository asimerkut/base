package com.er.fin.domain;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.internal.TypeLocatorImpl;
import org.hibernate.type.EnumType;
import org.hibernate.type.Type;
import org.hibernate.type.TypeResolver;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Properties;

public class FinUtil {

    /*
    public static SearchFilterDTO getSearchFilter(String query){
        try {
            ObjectMapper mapper = new ObjectMapper();
            SearchFilterDTO obj = mapper.readValue(query, SearchFilterDTO.class);
            return obj;
        } catch (IOException e) {
            return null;
        }
    }
    */

    public static String LPad(String str, int length, char c) {
        String ret = StringUtils.leftPad(str, length, c);
        return ret;
    }

    public static String RPad(String str, int length, char c) {
        String ret = StringUtils.rightPad(str, length, c);
        return ret;
    }

    public static Type getEnumHibernateType(Class<?> enumClass){
        String enumString = enumClass.getName();
        Properties params = new Properties();
        params.put("enumClass", enumString);
        params.put("type", "12");/*type 12 instructs to use the String representation of enum value*/
        Type retType = new TypeLocatorImpl(new TypeResolver()).custom(EnumType.class, params);
        return retType;
    }

    public static String formatToString(Date date){
        if (date==null)
            return null;
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }

    public static Date formatToDate(String strDate){
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        try{
            date = formatter.parse(strDate);
        } catch (Exception e){
            //log
        }
        return date;
    }

    public static LocalDate formatToLocalDate(String strDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = null;
        try{
            localDate = LocalDate.parse(strDate, formatter);
        } catch (Exception e){
            //log
        }
        return localDate;
    }

}
