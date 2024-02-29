using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using Firebase.Database;


[Serializable]

public class dataPoster1{
    public int PosterIndex;
    public bool Poster1Switch;
    public bool Poster2Switch;
    public bool Poster3Switch;
    public bool Poster4Switch;
}

public class ServerPoster1 : MonoBehaviour
{

public GameObject Cage;
public GameObject Free;

 public dataPoster1 dts;
   DatabaseReference dbRef;


     public void Awake(){
    dbRef = FirebaseDatabase.DefaultInstance.RootReference;
   }

public void SaveDataFn()
{
    // Create a new dataPoster1 object with only the PosterIndex field
    dataPoster1 posterIndexData = new dataPoster1
    {
        PosterIndex = dts.PosterIndex
    };

    // Convert the posterIndexData object to JSON
    string json = JsonUtility.ToJson(posterIndexData);

    // Set the value of "PosterIndex" child node in the database
    dbRef.Child("PosterIndex").SetRawJsonValueAsync(json);

    Debug.Log("Text: ");
}

   public void Start(){
            // Initialize the PosterIndex value
        dts.PosterIndex = 0;


   }
public void Update()
{
    if (Input.GetKeyDown("space"))
    {
        SaveDataFn();
    }
    if (Input.GetKeyDown("up"))
    {
        LoadDataFn();
    }
    LoadDataFn();
    dts.PosterIndex = 0;

    if(dts.Poster1Switch == true){
        Cage.SetActive(false);
        Free.SetActive(true);

    }   
     if(dts.Poster1Switch == false){
        Cage.SetActive(true);
        Free.SetActive(false);

    }

    SaveDataFn();


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
            

            dts = JsonUtility.FromJson<dataPoster1>(jsonData);
            print(dts.Poster1Switch);
        }
        else {
            print("no data found");
        }

    }



}