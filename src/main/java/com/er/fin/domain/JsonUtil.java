package com.er.fin.domain;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;

public class JsonUtil {

    public static JsonNode getJsonObject(String query) {
        try  {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode json = mapper.readTree(query);
            return json;
        } catch (Exception e){
            return null;
        }
    }

    public static JsonNode getValueJSON(JsonNode json, String s) {
        try  {
            ObjectMapper mapper = new ObjectMapper();
            String strObj = json.has(s)?json.get(s).asText():null;
            JsonNode jsonObj = mapper.readTree(strObj);
            return jsonObj;
        } catch (Exception e){
            return null;
        }
    }

    public static String getValueString(JsonNode json, String s) {
        try  {
            return json.has(s)?json.get(s).asText():null;
        } catch (Exception e){
            return null;
        }
    }

    public static Long getValueLong(JsonNode json, String s) {
        try  {
            return json.has(s)?json.get(s).asLong():null;
        } catch (Exception e){
            return null;
        }
    }

    public static LocalDate getValueLocalDate(JsonNode json, String s) {
        try  {
            String str = json.has(s)?json.get(s).asText():null;
            LocalDate date = FinUtil.formatToLocalDate(str);
            return date;
        } catch (Exception e){
            return null;
        }
    }

}
