using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using Firebase.Database;

[Serializable]

public class dataToSave{
    public int nbOfGobelins;
    public int PosterIndex;
    public bool switching;
}
public class DataServer : MonoBehaviour
{
   public dataToSave dts;
   public string userId;
   DatabaseReference dbRef;

   public void Awake(){
    dbRef = FirebaseDatabase.DefaultInstance.RootReference;
   }

   public void SaveDataFn() {

    string json = JsonUtility.ToJson(dts);
    dbRef.SetRawJsonValueAsync(json);
    Debug.Log("Text: ");
   }


   public void Update(){
    if (Input.GetKeyDown("space"))
        {
            SaveDataFn();
        }
          if (Input.GetKeyDown("up"))
        {
            LoadDataFn();
        }
    



   }

    public void LoadDataFn()
    {
        StartCoroutine(LoadDataEnum());
    }


    IEnumerator LoadDataEnum() 
    {
        var serverData = dbRef.GetValueAsync();
        yield return new WaitUntil(predicate: () => serverData.IsCompleted);

        print("process is complete");

        DataSnapshot snapshot = serverData.Result;
        string jsonData = snapshot.GetRawJsonValue();

        if (jsonData != null)
        {
            print("server data found");

            dts = JsonUtility.FromJson<dataToSave>(jsonData);
        }
        else {
            print("no data found");
        }

    }



}
