/** @format */

import { activeEffect, shouldTrack, trackEffects, triggerEffects } from "./effect"
import { TrackOpTypes, TriggerOpTypes } from "./operations"
import { reactive, toRaw } from "./reactive"
import { createDep, Dep } from "./dep"

declare const RefSymbol: unique symbol

export declare const RawSymbol: unique symbol

export interface Ref<T = any> {
    value: T
    /**
     * Type differentiator only.
     * We need this to be in public d.ts but don't want it to show up in IDE
     * autocomplete, so we use a private Symbol instead.
     */
    [RefSymbol]: true
}

type RefBase<T> = {
    dep?: Dep
    value: T
}

export function trackRefValue(ref: RefBase<any>) {
    if (shouldTrack && activeEffect) {
        ref = toRaw(ref)
        if (__DEV__) {
            trackEffects(ref.dep || (ref.dep = createDep()), {
                target: ref,
                type: TrackOpTypes.GET,
                key: "value",
            })
        } else {
            trackEffects(ref.dep || (ref.dep = createDep()))
        }
    }
}

export function triggerRefValue(ref: RefBase<any>, newVal?: any) {
    ref = toRaw(ref)
    const dep = ref.dep
    if (dep) {
        if (__DEV__) {
            triggerEffects(dep, {
                target: ref,
                type: TriggerOpTypes.SET,
                key: "value",
                newValue: newVal,
            })
        } else {
            triggerEffects(dep)
        }
    }
}

export type ReactiveRef<T> = {
    (v?: T): T
    value: T
}

export function reactiveRef<T>(value: T) {
    let _ref = reactive({ value })
    function func(v?: T) {
        if (typeof v === "undefined") return _ref.value
        else {
            return ((_ref.value as T) = v)
        }
    }

    class Proto extends Function {
        get value() {
            return _ref.value as T
        }
        set value(v: T) {
            ;(_ref.value as T) = v
        }
        get ref() {
            return _ref
        }
    }
    Object.setPrototypeOf(func, new Proto())
    return func as ReactiveRef<T>
}
