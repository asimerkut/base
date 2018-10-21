package com.er.fin.web.rest.util;

import com.er.fin.service.dto.FinUtil;
import org.json.JSONObject;

import java.time.LocalDate;

public class JsonUtil {

    public static JSONObject getJsonObject(String query) {
        try  {
            JSONObject json = new JSONObject(query);
            return json;
        } catch (Exception e){
            return null;
        }
    }

    public static JSONObject getValueJSON(JSONObject json, String s) {
        try  {
            String strObj = json.has(s)?json.getString(s):null;
            JSONObject jsonObj = new JSONObject(strObj);
            return jsonObj;
        } catch (Exception e){
            return null;
        }
    }

    public static String getValueString(JSONObject json, String s) {
        try  {
            return json.has(s)?json.getString(s):null;
        } catch (Exception e){
            return null;
        }
    }

    public static Long getValueLong(JSONObject json, String s) {
        try  {
            return json.has(s)?json.getLong(s):null;
        } catch (Exception e){
            return null;
        }
    }

    public static LocalDate getValueLocalDate(JSONObject json, String s) {
        try  {
            String str = json.has(s)?json.getString(s):null;
            LocalDate date = FinUtil.formatToLocalDate(str);
            return date;
        } catch (Exception e){
            return null;
        }
    }

}
