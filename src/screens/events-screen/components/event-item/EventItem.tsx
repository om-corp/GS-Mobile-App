import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { EventProps } from './event-props'
import { colors, fontSize } from '~/lib/theme'

export default function EventItem({ date, imageUrl, name, summary, volunteers, }: EventProps) {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.summary} numberOfLines={3} ellipsizeMode='tail'>{summary}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 10,
    },
    image: {
        backgroundColor: colors.accent,
        width: 130,
        borderRadius: 2,
    },
    name: {
        fontSize: fontSize.lg,
        fontWeight: '600'
    },
    date: {
        opacity: 0.5
    },
    summary: {
        width: 210
    },
})