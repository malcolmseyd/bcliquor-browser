package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"golang.org/x/sync/errgroup"
)

func main() {
	ids, err := getIds()
	if err != nil {
		log.Fatalln(ids)
	}

	group := &errgroup.Group{}
	group.SetLimit(100)

	for i, id := range ids {
		id := id
		i := i
		group.Go(func() error {
			err := getStores(id)
			log.Printf("%d: fetched %s\n", i, id)
			return err
		})
	}
	fmt.Println(group.Wait())
}

func getStores(id string) error {
	url :=
		"https://www.bcliquorstores.com/stores/search?format=json&sku=" + id
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("bad status: %v", resp.Status)
	}
	_, err = io.ReadAll(resp.Body)
	return err
}

func getIds() ([]string, error) {
	resp, err := http.Get("https://www.bcliquorstores.com/ajax/browse?sort=name.raw:asc&size=10000&page=1")
	if err != nil {
		return nil, fmt.Errorf("couldn't get all items: %w", err)
	}

	var itemData struct {
		Hits struct {
			Hits []struct {
				Id string `json:"_id"`
			} `json:"hits"`
		} `json:"hits"`
	}

	json.NewDecoder(resp.Body).Decode(&itemData)

	ids := make([]string, 0, len(itemData.Hits.Hits))
	for _, item := range itemData.Hits.Hits {
		ids = append(ids, item.Id)
	}
	return ids, nil
}
