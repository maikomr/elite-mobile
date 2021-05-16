import React, { useState, useCallback, useMemo, PropsWithChildren } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';

export interface ICollapsibleSectionProps {
  title: string;
  initiallyOpen?: boolean;
}

const Collapsible: React.FC<PropsWithChildren<ICollapsibleSectionProps>> = ({ title, initiallyOpen = true, children }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const iconName = useMemo(() => `arrow-ios-${isOpen ? 'upward' : 'downward'}-outline`, [isOpen]);

  const toggleIsOpen = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleIsOpen}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Icon style={styles.icon} fill="#000000" name={iconName} />
        </View>
      </TouchableOpacity>
      {isOpen ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 'auto'
  },
  icon: {
    width: 20,
    height: 20
  },
  body: {}
});

export default Collapsible;
