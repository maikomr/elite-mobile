import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, IndexPath, Card, Icon } from "@ui-kitten/components";

type Sale = { title: string, price: number };

interface ICourseSalesProps {
  sales: Sale[];
  selectedSaleIndex: IndexPath;
  onSelect: (index: number) => void;
}

const CourseSales = ({ sales, selectedSaleIndex, onSelect }: ICourseSalesProps) => {
  return (
    <View>
      <Text style={styles.saleSectionTitle} category="h6">
        Paquetes de oferta:
      </Text>
      <View style={styles.salesContainer}>
        {sales.map((sale: Sale, index: number) => {
          const isSelected = selectedSaleIndex.row === index;
          return (
            <Card
              style={[styles.saleCard, isSelected && styles.selectedSaleCard]}
              key={`sale-${index}`}
              onPress={() => onSelect(index)}
            >
              <View style={styles.saleCardBody}>
                <Text style={styles.saleTitle} category="h6" status="primary">
                  {sale.title}
                </Text>
                <Text style={styles.salePrice} category="h6" status="primary">
                  {sale.price} Bs.
                </Text>
                {isSelected && <Icon style={styles.icon} fill="#000000" name="checkmark-square-2-outline" />}
              </View>
            </Card>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  salesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  saleSectionTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  saleCard: {
    width: 110,
    height: 80,
    borderRadius: 10,
    borderWidth: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  selectedSaleCard: {
    width: 120,
    height: 100,
    shadowColor: "#FDDFD3",
  },
  saleCardBody: {
    alignItems: "center",
  },
  saleTitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#000000",
  },
  salePrice: {
    fontSize: 14,
    textAlign: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 8,
  },
});

export default CourseSales;
